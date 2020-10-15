<template>
  <div class="row">
    <div class="col-sm-4 off-set">
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <label for="exampleInputEmail1">Email address</label>
          <input
            type="text"
            placeholder="Email"
            v-model="email"
            class="form-control"
            required
          />
        </div>
        <div class="form-group">
          <label for="exampleInputPassword1">Password</label>
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            class="form-control"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Register Admin</button>
      </form>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/functions";

export default {
  name: "RegisterAdmin",
  data() {
    return {
      email: "",
      password: "",
      user: null,
    };
  },
  methods: {
    async onSubmit() {
      let admin = {
        role: {
          admin: true,
        },
      };
      await firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((response) => {
          if (response) {
            const setAdmin = firebase.functions().httpsCallable("setAdmin");
            const data = { uid: response.user.uid, role: admin.role };
            setAdmin(data)
              .then((result) => {
                console.log(`index.js - 183 - "🎉"`, result);
              })
              .then(() => {
                // signout
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    this.$router.push("/login");
                  });
              });
          }
        })
        .catch((error) => {
          // Handle Errors here.
          console.log("🤡", error.message);
        });
    },
  },
};
</script>