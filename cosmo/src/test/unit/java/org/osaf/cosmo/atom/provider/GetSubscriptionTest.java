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
package org.osaf.cosmo.atom.provider;

import org.apache.abdera.protocol.server.provider.RequestContext;
import org.apache.abdera.protocol.server.provider.ResponseContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.osaf.cosmo.model.CollectionSubscription;

/**
 * Test class for {@link SubscriptionProvider#getEntry()} tests.
 */
public class GetSubscriptionTest extends BaseSubscriptionProviderTestCase {
    private static final Log log = LogFactory.getLog(GetSubscriptionTest.class);

    public void testGetSubscriptionEntry() throws Exception {
        CollectionSubscription sub = helper.makeAndStoreDummySubscription();
        RequestContext req = helper.createSubscriptionRequestContext(sub);

        ResponseContext res = provider.getEntry(req);
        assertNotNull("Null response context", res);
        assertEquals("Incorrect response status", 200, res.getStatus());
        assertNotNull("Null etag", res.getEntityTag());
    }

    public void testGenerationError() throws Exception {
        CollectionSubscription sub = helper.makeAndStoreDummySubscription();
        RequestContext req = helper.createSubscriptionRequestContext(sub);
        helper.enableGeneratorFailure();

        ResponseContext res = provider.getEntry(req);
        assertNotNull("Null response context", res);
        assertEquals("Incorrect response status", 500, res.getStatus());
    }
}