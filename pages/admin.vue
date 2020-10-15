<template>
  <section>
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h1>Admin</h1>
        <p v-if="user">User: {{ user.email }}</p>
        <button class="btn btn-primary mb-4" @click="signout">Signout</button>
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td data-label="Name">{{ user.email }}</td>
              <td>
                <select @change="changeRole(user.id, $event)">
                  <option :selected="user.role.subscriber" value="subscriber">
                    Subscriber
                  </option>
                  <option :selected="user.role.customer" value="customer">
                    Customer
                  </option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>
<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";

export default {
  name: "Admin",
  data() {
    return {
      users: [],
      user: null,
    };
  },
  created() {
    var self = this;
    firebase.auth().onAuthStateChanged((user) => {
      self.user = user;
    });
    this.users = [];
    firebase
      .firestore()
      .collection("roles")
      .get()
      .then((snap) => {
        snap.forEach((doc) => {
          var user = doc.data();
          user.id = doc.id;
          console.log("🌿", doc.data());
          if (!user.role.admin) this.users.push(user);
        });
      });
  },
  methods: {
    signout() {
      firebase
        .auth()
        .signOut()
        .then((user) => {
          this.$router.push("/login");
        });
    },
    changeRole(uid, event) {
      var setUserRole = firebase.functions().httpsCallable("setUserRole");
      var data = { uid: uid, role: { [event.target.value]: true } };
      setUserRole(data)
        .then((result) => {
          console.log("🎉", result);
        })
        .catch((error) => {
          console.log("🤡", error);
        });
    },
  },
};
</script>