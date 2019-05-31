/**
 * Copyright 2013-2018 the original author or authors from the JHipster project.
 *
 * This file is part of the JHipster project, see http://www.jhipster.tech/
 * for more information.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { validations: ValidationErrors } = require('../../exceptions/error_cases');

module.exports = {
  isValid,
  validate
};

/**
 * Checks whether the JDL validation is valid.
 * @param {JDLValidation} jdlValidation the validation to check for errors.
 * @returns {boolean} whether the validation is valid.
 */
function isValid(jdlValidation) {
  const errors = validate(jdlValidation);
  return errors.length === 0;
}

/**
 * Validates a JDL validation
 * @param {JDLValidation} jdlValidation the validation to check for errors.
 * @return {string[]} the error list.
 */

function validate(jdlValidation) {
  if (!jdlValidation) {
    throw new Error('A JDL validation has to be passed to be validated.');
  }
  const errors = [];
  if (!jdlValidation.name) {
    errors.push(ValidationErrors.NoName);
  }
  return errors;
}
