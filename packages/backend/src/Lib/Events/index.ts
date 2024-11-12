import { EventEmitter } from 'events';
import { eventTypes } from 'Lib/Events/Listeners/TypeChecking/eventTypes';
// import { UserListener } from 'Api/Modules/Client/OnboardingAndAuthentication/Events/Listeners/UserListener';

const Event: EventEmitter = new EventEmitter();

Event.on(eventTypes.user.signIn, UserListener.onUserSignIn);
Event.on(eventTypes.user.signUp, UserListener.onUserSignUp);

//TBD
//Add Other Events later
export default Event;
