/*
 * Copyright 2006 Open Source Applications Foundation
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
package org.osaf.cosmo.model;

import javax.persistence.Column;
import javax.persistence.DiscriminatorValue;
import javax.persistence.Entity;

import org.hibernate.validator.Length;


/**
 * Represents an attribute with a string value.
 */
@Entity
@DiscriminatorValue("string")
public class StringAttribute extends Attribute implements
        java.io.Serializable {

    public static final int VALUE_LEN_MAX = 2048;
    
    /**
     * 
     */
    private static final long serialVersionUID = 2417093506524504993L;
    
    @Column(name="stringvalue", length=VALUE_LEN_MAX)
    @Length(min=0, max=VALUE_LEN_MAX)
    private String value;

    // Constructors

    /** default constructor */
    public StringAttribute() {
    }

    public StringAttribute(QName qname, String value) {
        setQName(qname);
        this.value = value;
    }

    // Property accessors
    public String getValue() {
        return this.value;
    }

    public void setValue(String value) {
        this.value = value;
    }
    
    public void setValue(Object value) {
        if (value != null && !(value instanceof String))
            throw new ModelValidationException(
                    "attempted to set non String value on attribute");
        setValue((String) value);
    }
    
    public Attribute copy() {
        StringAttribute attr = new StringAttribute();
        attr.setQName(getQName().copy());
        attr.setValue(getValue());
        return attr;
    }
    
    /**
     * Convienence method for returning a String value on a StringAttribute
     * with a given QName stored on the given item.
     * @param item item to fetch StringAttribute from
     * @param qname QName of attribute
     * @return String value of StringAttribute
     */
    public static String getValue(Item item, QName qname) {
        StringAttribute ta = (StringAttribute) item.getAttribute(qname);
        if(ta==null)
            return null;
        else
            return ta.getValue();
    }
    
    /**
     * Convienence method for setting a String value on a StringAttribute
     * with a given QName stored on the given item.
     * @param item item to fetch StringAttribute from
     * @param qname QName of attribute
     * @param value value to set on StringAttribute
     */
    public static void setValue(Item item, QName qname, String value) {
        StringAttribute attr = (StringAttribute) item.getAttribute(qname);
        if(attr==null && value!=null) {
            attr = new StringAttribute(qname,value);
            item.addAttribute(attr);
            return;
        }
        if(value==null)
            item.removeAttribute(qname);
        else
            attr.setValue(value);
    }
}
