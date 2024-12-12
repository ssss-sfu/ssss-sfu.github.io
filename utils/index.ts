function formatDate(date: any) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

async function getLastCommitDate(
  repoOwner: string,
  repoName: string
): Promise<string> {
  const url = `https://api.github.com/repos/${repoOwner}/${repoName}/commits?per_page=1`;

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const commits = await response.json();

    if (commits.length === 0) {
      throw new Error("No commits found.");
    }

    const lastCommitDate = commits[0].commit.author.date;
    return lastCommitDate;
  } catch (error: any) {
    console.error("Error:", error.message);
    throw error;
  }
}

export { formatDate, getLastCommitDate };
