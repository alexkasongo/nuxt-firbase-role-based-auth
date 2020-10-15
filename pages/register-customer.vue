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
        <button type="submit" class="btn btn-primary">Register Customer</button>
      </form>
    </div>
  </div>
</template>

<script>
import * as firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "RegisterCustomer",
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    async onSubmit() {
      try {
        var { user } = await firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password);
        // signout
        firebase
          .auth()
          .signOut()
          .then((user) => {
            this.$router.push("/login");
          });
      } catch (error) {
        console.log("🤡", error.message);
      }
    },
  },
};
</script>