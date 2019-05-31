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

const JDLValidationValidator = require('./jdl_validation_validator');
const { fields: FieldErrors } = require('../../exceptions/error_cases');

module.exports = {
  isValid,
  validate
};

/**
 * Checks whether the JDL field is valid.
 * @param {JDLField} jdlField the field to check for errors.
 * @returns {boolean} whether the field is valid.
 */

function isValid(jdlField) {
  const errors = validate(jdlField);
  return errors.length === 0;
}

/**
 * Validates a JDL field
 * @param {JDLField} jdlField the field to check for errors.
 * @return {string[]} the error list.
 */

function validate(jdlField) {
  if (!jdlField) {
    throw new Error('A JDL field has to be passed to be validated.');
  }
  const errors = [];
  if (!jdlField.name) {
    errors.push(FieldErrors.NoName);
  }
  if (!jdlField.type) {
    errors.push(FieldErrors.NoType);
  }
  if (jdlField.validations) {
    for (let i = 0; i < jdlField.validations.length; i++) {
      const validationErrors = JDLValidationValidator.validate(jdlField.validations[i]);
      if (validationErrors.length !== 0) {
        errors.push(`For validation #${i + 1}: ${validationErrors}`);
      }
    }
  }

  return errors;
}
