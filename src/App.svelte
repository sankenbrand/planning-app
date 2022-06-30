<script lang="ts">
  import { Route, Router } from "svelte-navigator"
  import Event from "./pages/Event.svelte"
  import Home from "./pages/Home.svelte"
  import Intro from "./pages/Intro.svelte"
  import Overview from "./pages/Overview.svelte"
  import UserForm from "./pages/UserForm.svelte"
</script>

<Router>
  <Route path="/">
    <Intro />
  </Route>
  <Route path="/home">
    <Home />
  </Route>
  <Route path="/user-form">
    <UserForm />
  </Route>
  <Route path="/overview">
    <Overview />
  </Route>
  <Route path="/events">
    <Event />
  </Route>
</Router>
