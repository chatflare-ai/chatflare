import { Client } from "@notionhq/client";

interface NotionClient {}

class NotionClientImpl implements NotionClient {
  client: Client;

  constructor(auth: string) {
    this.client = new Client({ auth });
  }
}
