import { prisma } from "../libs/prisma.js";
import { updateProfileSchema } from "../validations/schema.js";

//Proflie
export async function getUserBy(field, value) {
  return await prisma.user.findFirst({
    where: { [field]: value },
  });
}

export async function createUser(data) {
  return await prisma.user.create({ data: data });
}

//Update Profile
export async function updateProfileService(userId, data) {
  const validated = updateProfileSchema.parse(data);
  // console.log("validated", validated);

  const foundUser = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!foundUser) {
    throw createHttpError(404, "User not found");
  }

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: validated,
  });

  return updatedUser;
}
