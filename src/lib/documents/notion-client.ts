import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  DatabaseObjectResponse,
  SearchResponse,
  GetPageResponse,
} from "@notionhq/client/build/src/api-endpoints";

interface NotionClient {
  // get pages from notion
  allDocuments(): Promise<SearchResponse>;
  // get all pages
  allPages(): Promise<PageObjectResponse[]>;
  // get all databases
  allDatabases(): Promise<DatabaseObjectResponse[]>;
  // get page details
  pageDetails(pageId: string): Promise<GetPageResponse>;
}

class NotionClientImpl implements NotionClient {
  client: Client;

  constructor(auth: string) {
    if (!auth) {
      auth = "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";
    }
    this.client = new Client({ auth });
  }

  async allDocuments(): Promise<SearchResponse> {
    // SearchResponse
    // type: "page_or_database"
    // page_or_database: EmptyObject
    // object: "list"
    // next_cursor: string | null
    // has_more: boolean
    // results: Array<PageObjectResponse | PartialPageObjectResponse | PartialDatabaseObjectResponse | DatabaseObjectResponse>
    const response = await this.client.search({
      query: "",
      page_size: 100,
    });

    return response;
  }

  async allPages(): Promise<PageObjectResponse[]> {
    let allPages: PageObjectResponse[] = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const response = await this.client.search({
        query: "",
        page_size: 100,
        filter: {
          property: "object",
          value: "page",
        },
      });

      allPages = allPages.concat(
        response.results.filter(
          (result) => result.object === "page"
        ) as PageObjectResponse[]
      );
      hasMore = response.has_more;
      startCursor = response.next_cursor ?? undefined;
    }

    return allPages;
  }

  async allDatabases(): Promise<DatabaseObjectResponse[]> {
    let allDatabases: DatabaseObjectResponse[] = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const response = await this.client.search({
        query: "",
        start_cursor: startCursor,
        page_size: 100,
        filter: {
          property: "object",
          value: "database",
        },
      });

      allDatabases = allDatabases.concat(
        response.results.filter(
          (result) => result.object === "database"
        ) as DatabaseObjectResponse[]
      );
      hasMore = response.has_more;
      startCursor = response.next_cursor ?? undefined;
    }

    return allDatabases;
  }

  async pageDetails(pageId: string): Promise<GetPageResponse> {
    const response = await this.client.pages.retrieve({ page_id: pageId });

    const pageContent = await this.client.blocks.children.list({
      block_id: pageId,
      page_size: 100,
    });

    console.log("Page Content:");
    console.log(pageContent);
    console.log("Page Content End");
    return response;
  }
}

export { NotionClientImpl };
export type { NotionClient };