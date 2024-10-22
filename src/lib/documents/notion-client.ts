import { Client } from "@notionhq/client";
import {
  PageObjectResponse,
  DatabaseObjectResponse,
  SearchResponse,
  ListBlockChildrenResponse,
  BlockObjectResponse,
  PartialBlockObjectResponse,
  QueryDatabaseResponse,
  PartialDatabaseObjectResponse,
  PartialPageObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

const DEFAULT_PAGE_SIZE = 100;

interface NotionClient {
  // get all documents from notion
  allDocuments(): Promise<SearchResponse>;
  // get all pages
  allPages(): Promise<PageObjectResponse[]>;
  // get all databases
  allDatabases(): Promise<DatabaseObjectResponse[]>;
  // get page details
  pageDetails(pageId: string): Promise<ListBlockChildrenResponse>;
  // get all pages from a database
  allPagesFromDatabase(
    databaseId: string
  ): Promise<
    Array<
      | PageObjectResponse
      | PartialPageObjectResponse
      | PartialDatabaseObjectResponse
      | DatabaseObjectResponse
    >
  >;
  // retrieve children blocks recursively
  retrieveChildrenBlocksRecursively(
    blockId: string
  ): Promise<BlockObjectResponse[]>;
  // extract plain text from blocks of a page
  extractPlainTextFromPage(blocks: ListBlockChildrenResponse): string;
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

  async pageDetails(pageId: string): Promise<ListBlockChildrenResponse> {
    let allBlocks: Array<BlockObjectResponse | PartialBlockObjectResponse> = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const response = await this.client.blocks.children.list({
        block_id: pageId,
        start_cursor: startCursor,
        page_size: 100,
      });

      for (const block of response.results) {
        allBlocks.push(block);
        if ("has_children" in block && block.has_children) {
          const childrenBlocks = await this.retrieveChildrenBlocksRecursively(
            block.id
          );
          allBlocks = allBlocks.concat(childrenBlocks);
        }
      }

      hasMore = response.has_more;
      startCursor = response.next_cursor ?? undefined;
    }

    const completeResponse: ListBlockChildrenResponse = {
      type: "block",
      block: {},
      object: "list",
      next_cursor: "",
      has_more: false,
      results: allBlocks,
    };

    return completeResponse;
  }

  async allPagesFromDatabase(
    databaseId: string
  ): Promise<
    Array<
      | PageObjectResponse
      | PartialPageObjectResponse
      | PartialDatabaseObjectResponse
      | DatabaseObjectResponse
    >
  > {
    let allPages: Array<
      | PageObjectResponse
      | PartialPageObjectResponse
      | PartialDatabaseObjectResponse
      | DatabaseObjectResponse
    > = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const response: QueryDatabaseResponse = await this.client.databases.query(
        {
          database_id: databaseId,
          start_cursor: startCursor,
          page_size: DEFAULT_PAGE_SIZE,
        }
      );

      allPages = allPages.concat(response.results);
      hasMore = response.has_more;
      startCursor = response.next_cursor ?? undefined;
    }

    return allPages;
  }

  async retrieveChildrenBlocksRecursively(
    blockId: string
  ): Promise<BlockObjectResponse[]> {
    let allBlocks: BlockObjectResponse[] = [];
    let hasMore = true;
    let startCursor: string | undefined = undefined;

    while (hasMore) {
      const response = await this.client.blocks.children.list({
        block_id: blockId,
        start_cursor: startCursor,
        page_size: 100,
      });

      for (const block of response.results) {
        if ("type" in block) {
          allBlocks.push(block as BlockObjectResponse);
          if ("has_children" in block && block.has_children) {
            const childrenBlocks = await this.retrieveChildrenBlocksRecursively(
              block.id
            );
            if (childrenBlocks.length > 0) {
              allBlocks = allBlocks.concat(childrenBlocks);
            }
          }
        }
      }

      hasMore = response.has_more;
      startCursor = response.next_cursor ?? undefined;
    }

    return allBlocks;
  }

  extractPlainTextFromPage(blocks: ListBlockChildrenResponse): string {
    if (blocks.results.length == 0) {
      return "";
    }

    let text = "";
    blocks.results.forEach((block) => {
      if ("type" in block) {
        const blockObject = block as BlockObjectResponse;
        switch (blockObject.type) {
          case "paragraph":
            text += blockObject.paragraph.rich_text
              .map((text) => text.plain_text)
              .join("");
            text += "\n";
            break;
          case "heading_1":
            text += blockObject.heading_1.rich_text
              .map((text) => text.plain_text)
              .join("");
            text += "\n";
            break;
          case "heading_2":
            text += blockObject.heading_2.rich_text
              .map((text) => text.plain_text)
              .join("");
            text += "\n";
            break;
          case "heading_3":
            text += blockObject.heading_3.rich_text
              .map((text) => text.plain_text)
              .join("");
            text += "\n";
            break;
          case "bulleted_list_item":
            text += blockObject.bulleted_list_item.rich_text
              .map((text) => text.plain_text)
              .join("");
            text += "\n";
            break;
          case "numbered_list_item":
            text += blockObject.numbered_list_item.rich_text
              .map((text) => text.plain_text)
              .join("");
            text += "\n";
            break;
          case "quote":
            text += blockObject.quote.rich_text
              .map((text) => text.plain_text)
              .join("");
            text += "\n";
            break;
          case "to_do":
            text += blockObject.to_do.rich_text
              .map((text) => text.plain_text)
              .join("");
            text += "\n";
            break;
        }
      } else {
        //const blockObject = block as PartialBlockObjectResponse;
      }
    });

    return text;
  }
}

export { NotionClientImpl };
export type { NotionClient };
