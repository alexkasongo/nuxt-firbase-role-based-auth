<template>
  <div class="row">
    <div class="col-sm-4 off-set">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="email"
            class="form-control"
            placeholder="Enter email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            class="form-control"
            placeholder="Password"
            v-model="password"
          />
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
      </form>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Login",
  data: () => ({
    email: "",
    password: "",
  }),
  created() {
    firebase.auth().onAuthStateChanged((userAuth) => {
      if (userAuth) {
        firebase
          .auth()
          .currentUser.getIdTokenResult()
          .then((tokenResult) => {
            console.log("🍎 ", tokenResult.claims);
          });
      }
    });
  },

  methods: {
    async onSubmit() {
      try {
        const { user } = await firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password);
      } catch (error) {
        console.log("🤡", error);
      }
    },
  },
};
</script>