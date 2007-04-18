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
package org.osaf.cosmo.atom.provider.mock;

import org.apache.abdera.protocol.server.servlet.HttpServletRequestContext;
import org.apache.abdera.protocol.server.ServiceContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.springframework.mock.web.MockHttpServletRequest;
import org.springframework.mock.web.MockServletContext;

/**
 * Mock implementation of {@link RequestContext}.
 */
public class BaseMockRequestContext extends HttpServletRequestContext {
    private static final Log log =
        LogFactory.getLog(BaseMockRequestContext.class);

    public BaseMockRequestContext(ServiceContext context,
                                  String method,
                                  String uri) {
        super(context, createRequest(method, uri));
    }

    private static MockHttpServletRequest createRequest(String method,
                                                        String uri) {
        MockServletContext ctx = new MockServletContext();
        return new MockHttpServletRequest(ctx, method, uri);
    }

    MockHttpServletRequest getMockRequest() {
        return (MockHttpServletRequest) getRequest();
    }
}
