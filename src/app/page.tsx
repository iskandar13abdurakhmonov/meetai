"use client"

import {Button} from "@/components/ui/button";
import {useState} from "react";
import {Input} from "@/components/ui/input";
import {authClient} from "@/lib/auth-client";

export default function Home() {

    const { data: session } = authClient.useSession()

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const onSubmit = () => {
          authClient.signUp.email({
              name,
              email,
              password
          }, {
              onRequest: (ctx) => {
                  //show loading
              },
              onSuccess: (ctx) => {
                  //redirect to the dashboard or sign in page
                  alert('Success')
              },
              onError: (ctx) => {
                  // display the error message
                  alert(ctx.error.message);
              },
          })
    }

    const onLogin = () => {
        authClient.signIn.email({
            email,
            password
        }, {
            onRequest: (ctx) => {
                //show loading
            },
            onSuccess: (ctx) => {
                //redirect to the dashboard or sign in page
                alert('Success')
            },
            onError: (ctx) => {
                // display the error message
                alert(ctx.error.message);
            },
        })
    }

    if(session) {
        return (
            <div className="flex flex-col p-4 gap-y-4">
                <p>Logged in {session.user.name}</p>
                <Button onClick={() => authClient.signOut()}>
                    Sign Out
                </Button>
            </div>
        )
    }

      return (
          <div className="flex flex-col gap-y-10">
              <div className="p-4 flext flex-col gap-y-4">
                  <Input
                      placeholder="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                  <Input
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                      placeholder="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button onClick={onSubmit}>
                      Create user
                  </Button>
              </div>
              <div className="p-4 flext flex-col gap-y-4">
                  <Input
                      placeholder="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input
                      placeholder="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button onClick={onLogin}>
                      Log in
                  </Button>
              </div>
          </div>
      );
}
