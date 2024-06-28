document.addEventListener('DOMContentLoaded', function () { 
    const createPostBtn =  
        document.getElementById('createPostBtn'); 
    const createPostModal =  
        document.getElementById('createPostModal'); 
    const closeModal =  
        document.getElementById('closeModal'); 
    const postForm =  
        document.getElementById('postForm'); 
    const postSubmitBtn =  
        document.getElementById('postSubmitBtn'); 
    const postContainer =  
        document.querySelector('.post-container'); 
    const postDetailModal =  
        document.getElementById('postDetailModal'); 
    const closeDetailModal =  
        document.getElementById('closeDetailModal'); 
    const detailTitle =  
        document.getElementById('detailTitle'); 
    const detailDate =  
        document.getElementById('detailDate'); 
    const detailDescription =  
        document.getElementById('detailDescription'); 
            
        // signup and login
            const signUpBtn = document.getElementById('signUpBtn');
            const loginBtn = document.getElementById('loginBtn');
            const logoutBtn = document.getElementById('logoutBtn');
            const signUpModal = document.getElementById('signUpModal');
            const closeSignUpModal = document.getElementById('closeSignUpModal');
            const signUpForm = document.getElementById('signUpForm');
            const loginModal = document.getElementById('loginModal');
            const closeLoginModal = document.getElementById('closeLoginModal');
            const loginForm = document.getElementById('loginForm');
            let currentUser = null;
        
            // Open Sign Up Modal
            signUpBtn.addEventListener('click', function () {
                signUpModal.style.display = 'flex';
            });
        
            // Close Sign Up Modal
            closeSignUpModal.addEventListener('click', function () {
                signUpModal.classList.add('fadeOut');
                setTimeout(() => {
                    signUpModal.style.display = 'none';
                    signUpModal.classList.remove('fadeOut');
                }, 500);
            });
        
            // Handle Sign Up
            signUpForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const username = document.getElementById('signUpUsername').value;
                const password = document.getElementById('signUpPassword').value;
        
                // Save user (in local storage for simplicity)
                localStorage.setItem('user', JSON.stringify({ username, password }));
                alert('Sign Up successful!');
        
                signUpModal.style.display = 'none';
                signUpForm.reset();
            });
        
            // Open Login Modal
            loginBtn.addEventListener('click', function () {
                loginModal.style.display = 'flex';
            });
        
            // Close Login Modal
            closeLoginModal.addEventListener('click', function () {
                loginModal.classList.add('fadeOut');
                setTimeout(() => {
                    loginModal.style.display = 'none';
                    loginModal.classList.remove('fadeOut');
                }, 500);
            });
        
            // Handle Login
            loginForm.addEventListener('submit', function (event) {
                event.preventDefault();
                const username = document.getElementById('loginUsername').value;
                const password = document.getElementById('loginPassword').value;
                const storedUser = JSON.parse(localStorage.getItem('user'));
        
                if (storedUser && storedUser.username === username && storedUser.password === password) {
                    alert('Login successful!');
                    currentUser = storedUser;
                    loginModal.style.display = 'none';
                    loginForm.reset();
                    signUpBtn.style.display = 'none';
                    loginBtn.style.display = 'none';
                    logoutBtn.style.display = 'inline';
                } else {
                    alert('Invalid username or password!');
                }
            });
        
            // Handle Logout
            logoutBtn.addEventListener('click', function () {
                currentUser = null;
                signUpBtn.style.display = 'inline';
                loginBtn.style.display = 'inline';
                logoutBtn.style.display = 'none';
                alert('Logout successful!');
            });
        
          
        
       // edit post
        const editPostModal = document.getElementById('editPostModal');
        const closeEditModal = document.getElementById('closeEditModal');
        const editPostForm = document.getElementById('editPostForm');
        let postToEdit;
    
        // Open Edit Modal
        postContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('edit-post')) {
                postToEdit = event.target.closest('.post-box');
                const title = postToEdit.querySelector('.post-title').getAttribute('data-title');
                const category = postToEdit.querySelector('.category').innerText;
                const description = postToEdit.querySelector('.post-title').getAttribute('data-description');
    
                document.getElementById('editPostTitle').value = title;
                document.getElementById('editPostCategory').value = category;
                document.getElementById('editPostDescription').value = description;
    
                editPostModal.style.display = 'flex';
            }
        });
    
        // Close Edit Modal
        closeEditModal.addEventListener('click', function () {
            editPostModal.classList.add('fadeOut');
            setTimeout(() => {
                editPostModal.style.display = 'none';
                editPostModal.classList.remove('fadeOut');
            }, 500);
        });
    
        // Handle Edit Form Submit
        editPostForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const newTitle = document.getElementById('editPostTitle').value;
            const newCategory = document.getElementById('editPostCategory').value;
            const newDescription = document.getElementById('editPostDescription').value;
    
            postToEdit.querySelector('.post-title').textContent = newTitle;
            postToEdit.querySelector('.post-title').setAttribute('data-title', newTitle);
            postToEdit.querySelector('.post-title').setAttribute('data-description', newDescription);
            postToEdit.querySelector('.category').textContent = newCategory;
            postToEdit.querySelector('.post-description').textContent = newDescription.substring(0, 100) + '...';
    
            editPostModal.style.display = 'none';
        });   

        // comments
        const commentSection = document.getElementById('commentSection');
        const commentForm = document.getElementById('commentForm');
        const commentText = document.getElementById('commentText');
    
        // Store comments in local storage for simplicity
        let comments = JSON.parse(localStorage.getItem('comments')) || [];
    
        // Function to display comments
        function displayComments(postTitle) {
            commentSection.innerHTML = '';
            const postComments = comments.filter(comment => comment.postTitle === postTitle);
            postComments.forEach((comment, index) => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                commentDiv.innerHTML = `<div class="comment-user">${comment.username}</div>
                                        <div class="comment-text">${comment.text}</div>
                                        ${currentUser && currentUser.username === comment.username ? 
                                        `<button class="delete-comment" data-index="${index}">Delete</button>` : ''}`;
                commentSection.appendChild(commentDiv);
            });
        }
    
        // Handle comment form submission
        commentForm.addEventListener('submit', function (event) {
            event.preventDefault();
            if (currentUser) {
                const text = commentText.value;
                const postTitle = document.getElementById('detailTitle').innerText;
                const newComment = {
                    postTitle: postTitle,
                    username: currentUser.username,
                    text: text
                };
                comments.push(newComment);
                localStorage.setItem('comments', JSON.stringify(comments));
                displayComments(postTitle);
                commentForm.reset();
            } else {
                alert('You need to log in to add a comment.');
            }
        });

         // Handle delete comment
    commentSection.addEventListener('click', function (event) {
        if (event.target.classList.contains('delete-comment')) {
            const index = event.target.getAttribute('data-index');
            comments.splice(index, 1);
            localStorage.setItem('comments', JSON.stringify(comments));
            const postTitle = document.getElementById('detailTitle').innerText;
            displayComments(postTitle);
        }
    });
    
        // Open post detail modal and display comments
        postContainer.addEventListener('click', function (event) {
            if (event.target.classList.contains('post-title')) {
                const postTitle = event.target.getAttribute('data-title');
                const category = event.target.getAttribute('data-category');
                const description = event.target.getAttribute('data-description');
                document.getElementById('detailTitle').innerText = postTitle;
                document.getElementById('detailCategory').querySelector('span').innerText = category;
                document.getElementById('detailDescription').querySelector('span').innerText = description;
    
                postDetailModal.style.display = 'flex';
                displayComments(postTitle);
            }
        });



  
    createPostBtn.addEventListener('click', function () { 
        createPostModal.style.display = 'flex'; 
    }); 
  
    closeModal.addEventListener('click', function () { 
        // Add fadeOut class 
        createPostModal.classList.add('fadeOut'); 
        setTimeout(() => { 
            createPostModal.style.display = 'none'; 
            // Remove fadeOut class 
            createPostModal.classList.remove('fadeOut'); 
        }, 500); 
    }); 
  
    postForm.addEventListener('submit', function (event) { 
        event.preventDefault(); 
  
        // Validation 
        const postCategory =  
            document.getElementById('postCategory').value; 
        const postTitle =  
            document.getElementById('postTitle').value; 
        const postDescription =  
            document.getElementById('postDescription').value; 
  
        if (postCategory.trim() === '' || 
         postTitle.trim() === '' ||  
         postDescription.trim() === '') { 
            alert('Please fill out all fields.'); 
            return; 
        } 
  
        // Get the current date 
        const currentDate = new Date(); 
        const day = currentDate.getDate(); 
        const month = currentDate.toLocaleString('default', 
         { month: 'short' }); 
        const year = currentDate.getFullYear(); 
        const formattedDate = day + ' ' + month + ' ' + year; 
  
        // Create a new post element 
        const newPost = document.createElement('div'); 
        newPost.className = 'post-box'; 
        newPost.innerHTML = ` 
            <h1 class="post-title" data-title="${postTitle}"
         data-date="${formattedDate}"
          data-description="${postDescription}"> 
            ${postTitle}</h1><br> 
              
        <h2 class="category">${postCategory}</h2><br> 
        <span class="post-date">${formattedDate}</span> 
        <p class="post-description"> 
        ${postDescription.substring(0, 100)}...</p> 
        <button class="delete-post" data-title="${postTitle}"> 
        Delete</button> 
        <button class="edit-post" data-title="${postTitle}">Edit</button>

        <span class="load-more" data-title="${postTitle}" 
        data-date="${formattedDate}" 
        data-description="${postDescription}"> 
        Load more</span> 
        `; 
  
        // Append the new post to the post container 
        postContainer.insertBefore(newPost,  
            postContainer.firstChild); 
  
        const postCreatedMessage = document 
        .getElementById('postCreatedMessage'); 
        postCreatedMessage.style.display = 'block'; 
  
  
        // Close the modal 
        createPostModal.style.display = 'none'; 
  
        // Reset the form 
        postForm.reset(); 
  
        setTimeout(() => { 
            postCreatedMessage.style.display = 'none'; 
        }, 3000); 
    }); 
  
    postContainer.addEventListener('click', function (event) { 
        if (event.target.classList.contains('load-more') || 
         event.target.classList.contains('post-title')) { 
            const title = event.target.getAttribute('data-title'); 
            const date = event.target.getAttribute('data-date'); 
            const description =  
                event.target.getAttribute('data-description'); 
  
            // Set content in detail modal 
            detailTitle.textContent = title; 
            detailDate.textContent = date; 
            detailDescription.textContent = description; 
  
            // Display the detail modal 
            postDetailModal.style.display = 'flex'; 
        } 
  
        if (event.target.classList.contains('delete-post')) { 
            const titleToDelete =  
                event.target.getAttribute('data-title'); 
            const postToDelete =  
                document.querySelector(` 
            .post-title[data-title= 
                "${titleToDelete}"]`).closest('.post-box'); 
  
            // Add fadeOut class to initiate the animation 
            postToDelete.classList.add('fadeOut'); 
  
            // Remove the post after the animation completes 
            setTimeout(() => { 
                postContainer.removeChild(postToDelete); 
            }, 500); 
  
        } 
    }); 
  
    closeDetailModal.addEventListener('click', function () { 
      
        // Add fadeOut class 
        postDetailModal.classList.add('fadeOut');  
        setTimeout(() => { 
           postDetailModal.style.display = 'none'; 
             
           // Remove fadeOut class 
          postDetailModal.classList.remove('fadeOut');  
        }, 500); 
    }); 
}); 