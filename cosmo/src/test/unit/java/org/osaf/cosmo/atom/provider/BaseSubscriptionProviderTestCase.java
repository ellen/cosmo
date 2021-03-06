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

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.osaf.cosmo.atom.AtomConstants;
import org.osaf.cosmo.model.CollectionSubscription;
import org.osaf.cosmo.model.text.XhtmlSubscriptionFormat;

/**
 * Base class for for {@link SubscriptionProvider} tests.
 */
public abstract class BaseSubscriptionProviderTestCase
    extends BaseProviderTestCase implements AtomConstants {
    private static final Log log =
        LogFactory.getLog(BaseSubscriptionProviderTestCase.class);

    protected BaseProvider createProvider() {
        SubscriptionProvider provider = new SubscriptionProvider();
        provider.setUserService(helper.getUserService());
        return provider;
    }

    protected String serialize(CollectionSubscription sub) {
        XhtmlSubscriptionFormat formatter = new XhtmlSubscriptionFormat();
        return formatter.format(sub);
    }
}
