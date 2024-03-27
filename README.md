
## Todo
 - Clean the Code
 - Encrypt Stuff(password and stuff) 
 - secure endpoints
 - Css changes


## Front End

### Structure

- **Entry File**: `app.js`
- **How to Start**:
  - Install dependencies: `npm i`
  - Start the application: `npm run start`



#### Common Routes

- **Home**: `/`
- **Sign In**: `/SignIn`
- **Sign Up**: `/SignUp`
- **OTP Page**: `/SignUp/otp`
- **Categories**: `/Categories`
- **Contact Us**: `/Contact-Us`
- **Checkout Form**: `/checkout/:proId/:category`
- **Client Orders**: `/Orders`
- **Online Professionals**: `/online/professionals`
- **Chat Page**: `/chat/:s/:c/:b`

#### Professional Routes

- **Professional Dashboard**: `/professionals/dashboard/:id/:serviceId`
- **Professional Profile**: `/professional/:professionalId`

#### Admin Routes

- **Admin List**: `/admins`
- **New Admin**: `/newAdmin`
- **Admin Dashboard**: `/admin-dashboard`
- **User List**: `/users`
- **Service List**: `/services`
- **New Service**: `/newService`
- **Admin Details**: `/admin/:adminId`
- **Service Details**: `/service/:ServiceId`
- **User Details**: `/user/:userId`

#### Services Routes

- **All Services**: `/Categories/:category`
- **Service Page**: `/categories/:category/:subCategory`

#### Other Routes

- **User Dashboard**: `/dashboard`
- **Register as Professional**: `/RegisterAsProfessional`
- **Under Construction Page**: `/under-construction`
- **Success Page**: `/success.html`
- **Error Page**: `*`



## Getting Started

To get started with this project, follow these steps:

1. **Back End**:
   - Navigate to the back end directory.
   - Run `npm i` to install dependencies.
   - For development, start the server using `npm run dev`.
   - For production, start the server using `npm run start`.

 - [Backend](https://github.com/sanjanastyles/titan)

## Notes

- Make sure you have Node.js and npm installed on your system.
- Ensure that both front end and back end servers are running simultaneously for full functionality.
