import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { usernameValidation } from "@/schemas/signUpSchema";
import { z } from "zod";

const UserNameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: Request) {
    await dbConnect();
    try {
        const { searchParams } = new URL(request.url);
        const queryParams = {
            username: searchParams.get("username"),
        };
        //vaidate with zod
        const result = UserNameQuerySchema.safeParse(queryParams);
        // console.log("unique username check result \n ", result);
        if (!result.success) {
            const usernameErrors =
                result.error.format().username?._errors || [];
            return Response.json(
                {
                    success: false,
                    message:
                        usernameErrors?.length > 0
                            ? usernameErrors.join(", ")
                            : "Invalid query parameters",
                },
                {
                    status: 400,
                }
            );
        }
        const { username } = result.data;
        const existingVerifiedUser = await UserModel.findOne({
            username,
            isVerified: true,
        });
        if (existingVerifiedUser) {
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken",
                },
                { status: 200 }
            );
        }
        return Response.json(
            {
                success: true,
                message: "Username is unique",
            },
            { status: 200 }
        );
    } catch (error) {
        console.error(error);
        return Response.json(
            {
                success: false,
                message: "Error checking username",
            },
            {
                status: 500,
            }
        );
    }
}
