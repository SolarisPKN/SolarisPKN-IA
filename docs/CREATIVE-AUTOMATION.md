# Creative and desktop automation

Treat creative applications as capability providers rather than hard-coded special cases.

Possible capabilities:

```text
3d.scene.inspect
3d.model.edit
3d.render
video.project.inspect
video.timeline.edit
video.color.adjust
video.audio.mix
video.render
stream.scene.switch
stream.source.update
image.edit
layout.design
```

Prefer typed, high-level operations. Arbitrary embedded scripting is a stronger capability and should be separately controlled.

The public blueprint contains no application-specific plugin, vendor SDK, or external MCP server source.
