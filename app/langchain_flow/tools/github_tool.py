import requests
from pydantic import BaseModel, Field
from langchain_core.tools import tool


BASE_URL = "https://api.github.com"

class UserRepositoriesInput(BaseModel):
    """Input for listing a user's repositories."""

    username: str = Field(
        description="GitHub username. Example: microsoft"
    )


class RepositoryInput(BaseModel):
    """Input for repository details."""

    owner: str = Field(
        description="Repository owner. Example: facebook"
    )

    repo: str = Field(
        description="Repository name. Example: react"
    )


class SearchRepositoryInput(BaseModel):
    """Input for searching repositories."""

    query: str = Field(
        description="Search keyword. Example: react"
    )

@tool(args_schema=UserRepositoriesInput)
def get_user_repositories(username: str) -> str:
    """
    Return the public GitHub repositories for the given username.
    """

    url = f"{BASE_URL}/users/{username}/repos"

    headers = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "ChatBot"

    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return "GitHub user not found."

    repos = response.json()
    repos = sorted(
    repos,
    key=lambda repo: repo["stargazers_count"],
    reverse=True
    )

    if not repos:
        return "No repositories found."

    result = f"# 📂 GitHub Repositories of {username}\n\n"

    for repo in repos[:10]:

        result += (
            f"## 📦 Repository: {repo['name']}\n"
            f"- ⭐ **Stars:** {repo['stargazers_count']}\n"
            f"- 💻 **Language:** {repo['language'] or 'Not specified'}\n"
            f"- 📝 **Description:** {repo['description'] or 'No description'}\n"
            f"- 🔗 {repo['html_url']}\n"
            f"{'-'*50}\n"
        )

    return result
   

@tool(args_schema=RepositoryInput)
def get_repository(owner: str, repo: str) ->str:
    """
    Return detailed information about a GitHub repository.
     Use this tool whenever the user asks about:
    - repository details
    - information about a repository
    - tell me about a repository
    - describe a repository

    Required arguments:
    owner: GitHub username or organization.
    repo: Repository name.

    Example:
    owner="microsoft"
    repo="vscode"
    """
    print("========== get_repository ==========")
    print("Owner:", owner)
    print("Repo:", repo)
    print("====================================")
    url = f"{BASE_URL}/repos/{owner}/{repo}"

    headers = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "ChatBot"
    }

    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return "Repository not found."

    repo = response.json()


    return f"""
    Repository: {repo['name']}

    Description: {repo['description']}

    ⭐ Stars: {repo['stargazers_count']}

    🍴 Forks: {repo['forks_count']}

    💻 Language: {repo['language']}

    🐞 Open Issues: {repo['open_issues_count']}

    🔗 {repo['html_url']}
"""


@tool(args_schema=SearchRepositoryInput)
def search_repository(query: str) ->str:
    """
    Search GitHub repositories.
    """

    url = f"{BASE_URL}/search/repositories?q={query}"
    
    headers = {
    "Accept": "application/vnd.github+json",
    "User-Agent": "ChatBot"
    }
    response = requests.get(url,headers=headers)
    if response.status_code != 200:
        return "Unable to search GitHub repositories."

    data = response.json()

    repos = data.get("items", [])

    if not repos:
        return "No repositories found."

    result = f"Top repositories for '{query}'\n\n"

    for repo in repos[:10]:

        result += (
            f"📦 Repository: {repo['full_name']}\n"
            f"⭐ Stars: {repo['stargazers_count']}\n"
            f"💻 Language: {repo['language'] or 'Not specified'}\n"
            f"📝 {repo['description'] or 'No description'}\n"
            f"🔗 {repo['html_url']}\n"
            f"{'-'*50}\n"
        )

    return result