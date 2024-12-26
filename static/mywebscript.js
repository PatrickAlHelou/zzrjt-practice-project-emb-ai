// Function to run sentiment analysis for predefined and custom comments
async function RunSentimentAnalysis(commentText, resultId) {
  const resultDiv = document.getElementById(resultId);

  try {
    // Check if the comment text exists
    if (!commentText) {
      resultDiv.innerHTML =
        "<p style='color: red;'>No text provided for sentiment analysis.</p>";
      return;
    }

    // Send the text to the Flask backend for analysis
    const response = await fetch("/analyze", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: commentText }),
    });

    // Handle the response
    const data = await response.json();
    if (data.error) {
      resultDiv.innerHTML = `<p style='color: red;'>Error: ${data.error}</p>`;
    } else {
      resultDiv.innerHTML = `<pre style="color: ${
        data.result === "POSITIVE" ? "green" : "red"
      };">Sentiment: ${data.result}</pre>`;
    }
  } catch (error) {
    resultDiv.innerHTML = `<p style='color: red;'>An error occurred: ${error}</p>`;
  }
}

// Function to analyze the user input box
async function RunInputSentimentAnalysis() {
  const textToAnalyze = document.getElementById("textToAnalyze").value;
  const resultDiv = document.getElementById("system_response");

  if (!textToAnalyze) {
    resultDiv.innerHTML =
      "<p style='color: red;'>Please enter text to analyze.</p>";
    return;
  }

  // Reuse the same function for analyzing sentiment
  RunSentimentAnalysis(textToAnalyze, "system_response");
}

// Function to add a new user comment dynamically
function addCustomComment() {
  const commentText = document.getElementById("userComment").value;

  // Check if the input is empty
  if (!commentText) {
    alert("Please enter a comment!");
    return;
  }

  // Generate a unique ID for the result div
  const commentId = `customResult${Date.now()}`;
  const commentSection = document.getElementById("custom_comments");

  // Create new comment dynamically
  const commentHTML = `
    <div class="comment-box mt-3">
      <strong>You:</strong>
      <p>${commentText}</p>
      <button
        onclick="RunSentimentAnalysis('${commentText.replace(
          /'/g,
          "\\'"
        )}', '${commentId}')"
        class="btn btn-info btn-check-sentiment"
      >
        Check Sentiment
      </button>
      <div id="${commentId}" class="sentiment-result"></div>
    </div>
  `;

  // Append the new comment to the comment section
  commentSection.innerHTML += commentHTML;

  // Clear the input box
  document.getElementById("userComment").value = "";
}
