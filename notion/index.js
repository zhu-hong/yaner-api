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
}

module.exports = new Notion(process.env.NOTION_TOKEN)