/*
Assignement:

HTML: Complete the HTML to have semantic and compliant markups.

JAVASCRIPT: Dynamically add a user to the users list.
- Highlight the email input when a user enters an invalid email address and display following message: "please enter a valid email address" in red.
- Use the add_user function to submit the user's data.
- If the ajax request returns an error, display the error message in red.
- Display the newly added user in the users list when the request was successful.

BONUS:
- no jQuery
- add some CSS3 properties

*/


// START YOUR CODE HERE

var userForm = document.getElementById('user-add'),  // intereacts with user-ad
    userName = document.getElementById('user-name'), // interacts with user-name
    userEmail = document.getElementById('user-email'), // interacts with user-email
    userList = document.getElementById('users'); // interacts with users

userForm.addEventListener('submit', function(e) {
    e.preventDefault && e.preventDefault() || (e.returnValue = false);

    if(!userName.validity.valid || !userEmail.validity.valid) {
        alert('There was a problem with your entry!  Please check again.');
        return false;
    }

    addUser(
        userName.value,
        userEmail.value,
        function(resp) {
            if(resp.success) {
                var newUser = document.createElement('li');
                newUser.textContent =
                    resp.user.username
                    + ' | '
                    + resp.user.email;

                userList.appendChild(newUser);
            } else {
                alert(resp.error);
            }
        }
    );
});

// END YOUR CODE HERE




// Do not modify this function. Add user service wrapper.
function addUser(username, email, callback) {
    var response,
        success = (!!Math.round(Math.random()));

    if(!success){
        response = JSON.stringify({
            success: success,
            error: "Oups, something went wrong!"
        });
    } else {
        response = JSON.stringify({
            success: success,
            user: {
                username: username,
                email: email
            }
        });
    }

    $.ajax({
        url: '/echo/json/',
        type: "post",
        data: {
            json: response
        },
        success: callback
    });
};
