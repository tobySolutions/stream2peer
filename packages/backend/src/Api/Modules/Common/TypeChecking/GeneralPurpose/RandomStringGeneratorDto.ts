export interface RandomStringGeneratorDto {
  /**
   * The length of the random string to be generated
   */
  characterLength: number;

  /**
   * Defines the character set of the string to be generated.
   * Options are numeric or Alphanumeric(Default)
   */
  outputOption?: "numeric" | "alphanumeric";

  /**
   * Defines whether the output should be capitalized or not
   */
  isCapitalized?: boolean;
}
