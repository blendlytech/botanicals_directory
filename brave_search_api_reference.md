# Brave Search API Reference

This document provides the technical specification for the Brave Search API, to be used by Gemini CLI and Antigravity agents for advanced web research.

---

## 1. Web Search
`GET` `https://api.search.brave.com/res/v1/web/search`

Search the web from a large independent index of web pages.

### Authorization
| Name | Location | Type | Required | Description |
|------|----------|------|----------|-------------|
| `x-subscription-token` | header | string | Yes | The subscription token that was generated for the product. |

### Query Parameters
| Name | Location | Type | Required | Description |
|------|----------|------|----------|-------------|
| `q` | query | string | Yes | The user's search query term. Max 400 chars, 50 words. |
| `count` | query | integer | No | Number of results (max 20). |
| `offset` | query | integer | No | Pagination offset (0-9). |
| `safesearch` | query | string | No | `off`, `moderate`, `strict`. |
| `freshness` | query | string | No | `pd` (24h), `pw` (7d), `pm` (31d), `py` (365d), or `YYYY-MM-DDtoYYYY-MM-DD`. |
| `result_filter` | query | string | No | Comma-delimited: `discussions`, `faq`, `infobox`, `news`, `videos`, `web`, `locations`. |
| `spellcheck` | query | boolean | No | Whether to spell check query. |
| `units` | query | string | No | `metric` or `imperial`. |

### Headers
| Name | Description |
|------|-------------|
| `x-loc-lat` / `x-loc-long` | Latitude/Longitude for local results. |
| `x-loc-city` / `x-loc-state` | City and State for location-based results. |
| `api-version` | `YYYY-MM-DD` (Default is latest). |
| `accept` | `application/json`. |

### Response Schema (200 OK)
The response is a complex JSON object containing results for the requested filters.

#### Key Web Result Fields
| Field | Type | Description |
|-------|------|-------------|
| `results[].title` | string | Title of the result. |
| `results[].url` | string | Target URL. |
| `results[].description` | string | Snippet or description. |
| `results[].page_age` | string | Date of publication/modification. |
| `results[].meta_url` | object | Hostname and favicon info. |

---

## 2. News Search
`GET` `https://api.search.brave.com/res/v1/news/search`

Search news content from a large independent index of web pages.

### Authorization
| Name | Location | Type | Required | Description |
|------|----------|------|----------|-------------|
| `x-subscription-token` | header | string | Yes | The subscription token that was generated for the product. |

### Query Parameters
| Name | Location | Type | Required | Description |
|------|----------|------|----------|-------------|
| `q` | query | string | Yes | The user's search query term. Max 400 chars, 50 words. |
| `search_lang` | query | string | No | Language preference for results. |
| `country` | query | string | No | Country code or `ALL` for worldwide. |
| `safesearch` | query | string | No | `off`, `moderate`, `strict`. |
| `count` | query | integer | No | Number of results (max 50). |
| `offset` | query | integer | No | Pagination offset (0-9). |
| `freshness` | query | string | No | Filter by age (e.g., `pd`, `pw`, `pm`, `py`). |
| `extra_snippets` | query | string | No | Up to 5 additional snippets. |

### Response Schema (200 OK)
| Field | Type | Description |
|-------|------|-------------|
| `results[].title` | string | Title of the news article. |
| `results[].url` | string | Source URL of the article. |
| `results[].description` | string | Description/Snippet. |
| `results[].age` | string | Human-readable age (e.g., "2 days ago"). |
| `results[].breaking` | bool | Whether the news is breaking. |
| `results[].thumbnail.src`| string | URL of the article thumbnail. |

### Code Sample (cURL)
```bash
curl "https://api.search.brave.com/res/v1/news/search?q=rare+botanicals" \
  -H "Accept: application/json" \
  -H "X-Subscription-Token: <YOUR_API_KEY>"
```

---

**Usage Tip:** When searching for rare plants, use `Web Search` with `result_filter=discussions` for community advice, and `News Search` for recent discoveries or conservatory updates.

