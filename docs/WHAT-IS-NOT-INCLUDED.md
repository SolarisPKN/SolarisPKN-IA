# What is not included

This public package intentionally excludes the private or third-party portions of a full deployment.

## Private owner data

Not included:

- personality/persona files;
- personal memory;
- conversations;
- private projects;
- owner identity/profile data;
- health or biometric data;
- device-specific secrets;
- local filesystem inventory;
- runtime logs and checkpoints.

## Third-party material

Not included:

- external framework source trees;
- third-party agent source code;
- vendor SDK source;
- model weights;
- proprietary prompts;
- copied vendor documentation;
- external application plugins;
- credentials for any external account.

## Integration strategy

A private installation may connect compatible external systems through generic provider interfaces. That integration belongs in local/private configuration or a separately licensed adapter package.
