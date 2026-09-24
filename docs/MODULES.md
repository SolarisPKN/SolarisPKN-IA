# Public subsystem map

This is a conceptual map, not a claim that every deployment needs every module.

| Module | Purpose |
|---|---|
| Core session runtime | Durable event stream and turn state |
| Natural router | User intent and task shape |
| Capability registry | Provider-neutral capability discovery |
| Tool broker | Small relevant tool subset per turn |
| Policy pipeline | Deny-by-default action control |
| Approval store | Exact one-shot authorization |
| Sandbox | Restricted code/process execution |
| Memory | Typed, provenance-aware durable knowledge |
| Retrieval | Search and context assembly |
| Review | Independent checks on candidate changes |
| Learning | Teacher/exercise/evaluation interfaces |
| Skills | Reviewed procedural knowledge |
| Scheduler | Recurring/background work |
| Subagents | Scoped delegation with inherited ceilings |
| Gateway | Typed control plane for channels/nodes |
| Nodes | Device identity, pairing, presence and capabilities |
| Voice | STT/TTS/realtime conversation transport |
| Creative fabric | Generic application/media capabilities |
| App engineering | Plan/build/verify portable software |
| Doctor | Unified diagnostics and observability |
| State manifest | Generated live description of the system |
