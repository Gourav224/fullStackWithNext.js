import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, code } = await request.json();
        const decodeUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({ username: decodeUsername });
        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                {
                    status: 500,
                }
            );
        }
        const isCodeValid = user.verifyCode == code;
        console.log(code)
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
        if (isCodeNotExpired && isCodeValid) {
            user.isVerified = true;
            await user.save();
            return Response.json(
                {
                    success: true,
                    message: "Account verified successfully",
                },
                {
                    status: 200,
                }
            );
        }
        if (!isCodeNotExpired) {
            return Response.json(
                {
                    success: false,
                    message:
                        "Verification code has expired , please signup again",
                },
                {
                    status: 400,
                }
            );
        }
        return Response.json(
            {
                success: false,
                message: "Invalid code",
            },
            {
                status: 400,
            }
        );
    } catch (error) {
        console.error(error);
        return Response.json(
            {
                success: false,
                message: "Error verifing user",
            },
            {
                status: 500,
            }
        );
    }
}
