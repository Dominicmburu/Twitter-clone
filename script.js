document.addEventListener("DOMContentLoaded", function () {
    const userSelect = document.querySelector("select");
    const postsContainer = document.querySelector(".posts");
    const commentsContainer = document.querySelector(".comments");
    const profileName = document.getElementById("name");

    async function fetchUsers() {
        const response = await fetch("https://jsonplaceholder.typicode.com/users");
        const users = await response.json();

        users.forEach(user => {
            const option = document.createElement("option");
            option.value = user.id;
            option.textContent = user.username;
            userSelect.appendChild(option);
        });

        userSelect.value = "1";
        updateUser(1);
    }

    async function fetchPosts(userId) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        const posts = await response.json();

        postsContainer.innerHTML = "<h2>Posts</h2>";
        posts.forEach(post => {
            const postElement = document.createElement("div");
            postElement.classList.add("post");

            postElement.innerHTML = `
                    <img src="./images/pngwing.com (2).png" alt="">
                    <div class="post-body">
                        <p>${post.title}</p>
                        <span>${post.body}</span>
                    </div>
                `;

            postElement.addEventListener("click", () => fetchComments(post.id));
            postsContainer.appendChild(postElement);
        });

        if (posts.length > 0) {
            fetchComments(posts[0].id);
        }
    }

    async function fetchComments(postId) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        const comments = await response.json();

        commentsContainer.innerHTML = "<h2>Comments</h2>";
        comments.forEach(comment => {
            const commentElement = document.createElement("div");
            commentElement.classList.add("comment");

            commentElement.innerHTML = `
                    <img src="./images/pngwing.com (1).png" alt="">
                    <div class="body">
                        <p>${comment.name}</p>
                        <span>${comment.body}</span>
                    </div>
                `;

            commentsContainer.appendChild(commentElement);
        });
    }

    async function updateUser(userId) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        const user = await response.json();

        profileName.textContent = user.name;
        document.querySelector(".profile span").textContent = `@${user.username}`;
        document.querySelector(".profile p").textContent = `${user.username.length} posts`;

        fetchPosts(userId);
    }

    userSelect.addEventListener("change", function () {
        const userId = this.value;
        updateUser(userId);
    });

    fetchUsers();
});
