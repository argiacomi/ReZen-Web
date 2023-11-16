import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email:', type: 'text', placeholder: 'testuser@gmail.com' },
        password: { label: 'Password:', type: 'password', placeholder: 'test' }
      },
      async authorize(credentials) {
        const user = { id: 1, name: 'J Smith', email: 'testuser@gmail.com', password: 'test' };
        console.log('credentials', credentials);
        if (credentials.email === user.email && credentials.password === user.password) {
          return user;
        } else {
          return null;
        }
      }
    })
  ]
});

export { handler as GET, handler as POST };
