export const eventTypes = {
  user: {
    signUp: 'onUserSignUp',
    signIn: 'onUserSignIn',
  },

  project: {
    invitedUser: 'onUserInvited',
    //other events
  },

  stream: {
    createdStream: 'onStreamCreated',
    suspendStream: 'onSuspendedStream',
    endStream: 'onEndStream',
    //other events
  },
};
