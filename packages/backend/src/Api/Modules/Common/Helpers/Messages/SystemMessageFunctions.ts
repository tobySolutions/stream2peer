export function RESOURCE_FETCHED_SUCCESSFULLY(resourceName = 'Resource') {
  return ` ${resourceName} Fetched Successfully`;
}

export function RESOURCE_RECORD_NOT_FOUND(resourceName = 'Resource') {
  return `${resourceName} Record Was not found`;
}

export function RESOURCE_RECORD_CREATED_SUCCESSFULLY(
  resourceName = 'Resource',
) {
  return `${resourceName} Record Created Successfully`;
}

export function RESOURCE_RECORD_UPDATED_SUCCESSFULLY(
  resourceName = 'Resource',
) {
  return `${resourceName} Record Updated Successfully`;
}

export function RESOURCE_LIST_FETCHED_SUCCESSFULLY(resourceName = 'Resource') {
  return `${resourceName} List Fetched Successfully`;
}

export function OPERATION_SUCCESS(operationName?: string) {
  return `${operationName} Operation was Successful`;
}

export function OPERATION_FAILURE(operationName?: string) {
  return `${operationName} Operation was failure`;
}