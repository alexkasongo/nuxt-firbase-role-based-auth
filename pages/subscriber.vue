<template>
  <section>
    <div class="ui middle aligned center aligned grid">
      <div class="column">
        <h1>Subscriber</h1>
        <p v-if="user">Subscriber: {{ user.email }}</p>
        <button class="btn btn-primary" @click="signout">Signout</button>
      </div>
    </div>
  </section>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      user: null,
    };
  },
  created() {
    var self = this;
    firebase.auth().onAuthStateChanged(function (user) {
      self.user = user;
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
  },
};
</script>