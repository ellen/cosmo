# 140-to-150-PostgresSQL-post.sql

# update server version
update server_properties SET propertyvalue='150' WHERE propertyname='cosmo.schemaVersion';
