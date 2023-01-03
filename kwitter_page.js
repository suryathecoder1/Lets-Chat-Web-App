//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyCeIF6MDBrEItHjwnl-V2DactgJ9AQKW6Q",
      authDomain: "kwitter2-84019.firebaseapp.com",
      databaseURL: "https://kwitter2-84019-default-rtdb.firebaseio.com",
      projectId: "kwitter2-84019",
      storageBucket: "kwitter2-84019.appspot.com",
      messagingSenderId: "84734911390",
      appId: "1:84734911390:web:1a7e18379c9929e6332c8f"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
user_name = localStorage.getItem("name");
console.log(user_name);
room_name = localStorage.getItem("Room_name");

document.getElementById("entered_room").innerHTML = "You have entered in : " + room_name;

function send() {
      Msg = document.getElementById("msg_input").value;

      firebase.database().ref(room_name).push({
            User: user_name,
            Like: 0,
            Message: Msg
      });

      document.getElementById("msg_input").value = "";
}

function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);

                        login_name = message_data["User"];
                        console.log(user_name);
                        like = message_data["Like"];
                        msg = message_data["Message"];

                        name_tag = "<h4>" + login_name + "<img src='tick.png' class='user_tick'> </h4>";
                        msg_tag = "<h4>" + msg + "</h4>";
                        like_btn = "<button class= 'btn btn-warning' id=" + firebase_message_id + " value= " + like + " onclick='updateLike(this.id)'>";
                        span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like:" + like + "</span></button><hr>";

                        row = name_tag + msg_tag + like_btn + span_tag;
                        document.getElementById("output").innerHTML += row;

                        //End code
                  }
            });
      });
}
getData();

function logout() {
      localStorage.removeItem("name");
      localStorage.removeItem("Room_name");
      window.location = "index.html";
}

function back() {
      localStorage.removeItem("Room_name")
      window.location = "kwitter_room.html";
}
// we are passing a variable clicked_msg to keep a track on the message id// 
function updateLike(clicked_msg) {
      console.log("clicked on like button - " + clicked_msg);

      likes_value = document.getElementById(clicked_msg).value;
      updated_likes = Number(likes_value) + 1;
      console.log(updated_likes);

      firebase.database().ref(room_name).child(clicked_msg).update({
            Like: updated_likes
      });
}

