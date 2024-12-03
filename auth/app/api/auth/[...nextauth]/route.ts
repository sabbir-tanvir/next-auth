import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: { label: 'email', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials: any) {
                console.log(credentials);

                return {
                    id: "user1",
                    name: "sabbir",
                    email: "sabbir@gmail.com"
                };
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
          }),

          GitHubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || "",
          })
    ],
    
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        signIn: ({ user }) => {
            if (user.email == "saba@gmail.com") {
                return false;
            }
            return true;

        }
    }
})

export { handler as GET, handler as POST }