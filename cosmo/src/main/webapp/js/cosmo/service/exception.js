/*
 * Copyright 2007 Open Source Applications Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

dojo.provide("cosmo.service.exception");

dojo.declare("cosmo.service.exception.ServiceException", Error,
    // summary: The root of all service exceptions. If your error is not an instance
function(){}, {});

dojo.declare("cosmo.service.exception.ConcurrencyException", cosmo.service.exception.ServiceException,
    // summary: Thrown when another client is trying to update the item on the server
function(){}, {});