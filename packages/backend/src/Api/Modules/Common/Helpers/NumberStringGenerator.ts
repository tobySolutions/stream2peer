import randomstring from "randomstring";
import { RandomStringGeneratorDto } from "Api/Modules/Common/TypeChecking/GeneralPurpose/RandomStringGeneratorDto";

export function NumberStringGenerator(
  randomStringGeneratorDto: RandomStringGeneratorDto
): string {
  const {
    characterLength,
    isCapitalized = false,
    outputOption = "alphanumeric",
  } = randomStringGeneratorDto;

  if (outputOption === "numeric") {
    return randomstring.generate({
      length: characterLength,
      charset: outputOption,
    });
  }

  return randomstring.generate({
    length: characterLength,
    charset: outputOption,
    capitalization: isCapitalized ? "uppercase" : "lowercase",
  });
}
