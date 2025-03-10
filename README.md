# Synple Core

## Purpose

This library is made to share the most elements possible between different (and possibly not yet existing) frontend applications. It mutualizes things like models representing the data, repositories accessing said data, or services orchestrating said repositories. The goal is to have simpler frontend applications without any business logic about creating, updating, getting or deleting elements like synthesizers, parameters values, sessions, etc. In the end, everything should be neatly organized, and preferably tested to the fullest extend in this library. What cannot be tested must be as isolated as technically possible to limit any side effect.