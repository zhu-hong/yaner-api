const { Client } = require('@notionhq/client')
require('dotenv').config()

class Notion {
  constructor(token) {
    this.client = new Client({ auth: token })
  }

  async getUsers() {
    const userPage = await this.client.databases.query({ database_id: process.env.NOTION_USER })

    return Promise.resolve(this.transformUserPage(userPage))
  }

  transformUserPage(userPage) {
    const users = []

    userPage.results.forEach(({ properties }) => {
      const user = {}
      user.id = properties.id.title[0].text.content
      user.account = properties.account.rich_text[0].text.content
      user.password = properties.password.rich_text[0].text.content
      user.nikename = properties.nikename.rich_text[0].text.content
      user.avatar = properties.avatar.files[0].file.url
      user.scope = properties.scope.number
      users.push(user)
    })

    return users
  }

  async getUserInfo(id) {
    const cuser = (await this.getUsers()).find(item => item.id === id)

    return Promise.resolve(cuser)
  }

  async getBills() {
    const billPage = await this.client.databases.query({ database_id: process.env.NOTION_BILL })

    return Promise.resolve(this.transformBillPage(billPage))
  }

  transformBillPage(billPage) {
    const bills = []

    billPage.results.forEach(({ properties }) => {
      const bill = {}

      bill.amount = properties.amount.number
      bill.inout = properties.inout.number
      bill.date = properties.date.date.start
      bill.tip = properties.tip.rich_text[0].text.content

      bills.push(bill)
    })

    return bills
  }

  async postBill({ amount, inout, date, tip }) {
    await this.client.request({
      method: 'post',
      path: 'pages',
      body: {
        parent: { database_id: process.env.NOTION_BILL },
        properties: {
          id: {
            title: [
              {
                text: {
                  content: (await this.getBills()).length.toString(),
                },
              },
            ],
          },
          amount: {
            number: parseFloat(amount),
          },
          inout: {
            number: parseFloat(inout),
          },
          date: {
            date: {
              start: date,
            },
          },
          tip: {
            rich_text: [
              {
                text: {
                  content: tip,
                },
              },
            ],
          },
        },
      },
    })
  }
}

module.exports = new Notion(process.env.NOTION_TOKEN)