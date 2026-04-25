# MCP "Zero-to-Sale" Guide: PayPal Business Edition

This guide contains only the MCP servers that are free to use or offer generous recurring monthly credits, ensuring you can launch the Rare Plant Vendors platform without initial overhead.

## 1. PayPal Business MCP (Pay-As-You-Go)

**Purpose:** Create payment links, send invoices, and track vendor payouts for your Botanicals Directory.

- **Cost:** No monthly fee. PayPal only charges a transaction fee when you make a sale.
- **Command:** `npx -y @smithery/paypal`
- **Config Snippet:**

  ```json
  "paypal": {
    "command": "npx",
    "args": ["-y", "@smithery/paypal"],
    "env": {
      "PAYPAL_CLIENT_ID": "YOUR_BUSINESS_CLIENT_ID",
      "PAYPAL_CLIENT_SECRET": "YOUR_BUSINESS_SECRET"
    }
  }
  ```

## 2. Resend MCP Server (3,000 Emails/Mo Free)

**Purpose:** Critical for "New Order" notifications and sending rare plant care guides upon purchase.

- **Cost:** Free for 3,000 emails/month.
- **Command:** `npx -y resend-mcp`
- **Config Snippet:**

  ```json
  "resend": {
    "command": "npx",
    "args": ["-y", "resend-mcp"],
    "env": { "RESEND_API_KEY": "YOUR_RE_KEY" }
  }
  ```

## 3. Brave Search MCP (Generous Free API)

**Purpose:** Researching rare plant species and sourcing new vendors without premium costs.

- **Cost:** 2,000 free queries/month.
- **Command:** `npx -y @modelcontextprotocol/server-brave-search`
- **Config Snippet:**

  ```json
  "brave-search": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-brave-search"],
    "env": { "BRAVE_API_KEY": "YOUR_BRAVE_KEY" }
  }
  ```

## 4. Official GitHub MCP Server (100% Free)

**Purpose:** Manage the `botanicals_directory` codebase, automate backups, and track feature requests.

- **Cost:** Free.
- **Command:** `npx -y @modelcontextprotocol/server-github`
- **Config Snippet:**

  ```json
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": { "GITHUB_PERSONAL_ACCESS_TOKEN": "YOUR_TOKEN" }
  }
  ```

## 5. Puppeteer MCP (Free Local Web Scraping)

**Purpose:** Scrape botanical data or verify vendor websites for free using your local machine's resources.

- **Cost:** 100% Free.
- **Command:** `npx -y @modelcontextprotocol/server-puppeteer`
- **Config Snippet:**

  ```json
  "puppeteer": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-puppeteer"]
  }
  ```

---

### Implementation Instructions

1. **API Keys:** You will need to generate a "REST API App" in your [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/) to get your Client ID and Secret.
2. **Setup:** Provide this guide to the Antigravity agent to update your `mcp_config.json`.
3. **First Sale:** Once connected, you can tell the agent: *"Generate a PayPal invoice for a new 'Canopy' tier vendor and send it via Resend."*
