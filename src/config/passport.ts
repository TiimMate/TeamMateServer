import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as KakaoStrategy } from "passport-kakao";
import { Strategy as NaverStrategy } from "passport-naver";
import { createOrReadUser } from "../services/users.service";

// passport.use(
//     new GoogleStrategy(
//         {
//             clientID: process.env.GOOGLE_CLIENT_ID!,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//             callbackURL: process.env.GOOGLE_CALLBACK_URL!,
//         },
//         (accessToken, refreshToken, profile, done) => {
//             createOrReadUser(profile.provider, profile.id, profile._json.email)
//                 .then((user) => done(null, user))
//                 .catch((err) => {
//                     done(err);
//                 });
//         },
//     ),
// );

passport.use(
    new KakaoStrategy(
        {
            clientID: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET,
            callbackURL: process.env.KAKAO_CALLBACK_URL!,
        },
        (accessToken, refreshToken, profile, done) => {
            createOrReadUser(profile.provider, profile.id, profile._json.kakao_account.email)
                .then((user) => done(null, user))
                .catch((err) => {
                    done(err);
                });
        },
    ),
);

// passport.use(
//     new NaverStrategy(
//         {
//             clientID: process.env.NAVER_CLIENT_ID!,
//             clientSecret: process.env.NAVER_CLIENT_SECRET,
//             callbackURL: process.env.NAVER_CALLBACK_URL!,
//         },
//         (accessToken, refreshToken, profile, done) => {
//             createOrReadUser(profile.provider, profile.id, profile._json.email)
//                 .then((user) => done(null, user))
//                 .catch((err) => {
//                     done(err);
//                 });
//         },
//     ),
// );
