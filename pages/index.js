/* pages/index.js */

import React, { Component } from "react";
import Layout from "../components/Layout";
import Chat from "../components/Chat";

class IndexPage extends Component {
  state = { user: null };

  handleKeyUp = (evt) => {
    if (evt.keyCode === 13) {
      const user = evt.target.value.trim();
      if (user) this.setState({ user });
    }
  };

  render() {
    const { user } = this.state;

    const nameInputStyles = {
      background: "transparent",
      color: "#999",
      border: 0,
      borderBottom: "1px solid #666",
      borderRadius: 0,
      fontSize: "2rem",
      fontWeight: 500,
    };

    return (
      <Layout pageTitle="Realtime Chat">
        <main className="container-fluid min-vh-100 bg-dark d-flex flex-column justify-content-center align-items-center p-3">
          <div className="row w-100 flex-grow-1">
            <section className="col-12 col-md-8 d-flex justify-content-center align-items-center p-4">
              <div className="text-center w-100">
                <h1 className="text-light mb-4" style={{ fontSize: "2rem" }}>
                  {user ? (
                    <>
                      <span style={{ color: "#999" }}>Hello!</span> {user}
                    </>
                  ) : (
                    "What is your name?"
                  )}
                </h1>

                {!user && (
                  <input
                    type="text"
                    className="form-control mx-auto"
                    style={nameInputStyles}
                    onKeyUp={this.handleKeyUp}
                    autoComplete="off"
                    placeholder="Enter your name"
                  />
                )}
              </div>
            </section>

            <section className="col-12 col-md-4 bg-white px-0 d-flex flex-column h-100">
              {user && <Chat activeUser={user} />}
            </section>
          </div>
        </main>
      </Layout>
    );
  }
}

export default IndexPage;
