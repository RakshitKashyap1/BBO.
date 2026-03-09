from rest_framework.versioning import NamespaceVersioning

class BBOVersioning(NamespaceVersioning):
    default_version = 'v1'
    allowed_versions = ['v1']
    version_param = 'version'
