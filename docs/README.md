## VBS Overlay
### Publisher: Video Bridge Solutions  
### ⬇️ Releases: 
https://github.com/phalbig-VBS/VBS-Overlay/releases


### 💡 Feature requests: 
https://github.com/phalbig-VBS/VBS-Overlay/issues


# VBS Overlay — User Manual (EN)

* * *

## Overview

**VBS Overlay** is a **system and network monitoring tool** designed for **audiovisual production machines**  
(media servers, control rooms, backup machines).

It displays a **non-intrusive overlay** providing an immediate view of the machine’s real operating status.

### Displayed Information

*   overall system status
    
*   GPU and VRAM usage
    
*   network interfaces and IP addresses
    
*   storage usage
    
*   LAN machines
    
*   status indicators (Flags)
    

**Goal:** instantly know whether everything is working correctly, without disrupting live operations.

* * *

## Requirements and Recommended Environment

### System

*   Windows 10 or Windows 11 (x64)
    
*   Administrator rights required for installation
    

### Target Environment

*   Media Server (Resolume, etc.)
    
*   Dedicated GPU (AMD or NVIDIA)
    
*   Active local network (LAN)
    

* * *

## Installation

### Standard Installation

1.  Download the latest version from the **Releases** section
    
2.  Run `VBSOverlay_Setup_vX.Y.Z.exe`
    
3.  Follow the installation wizard
    

### Silent Installation (optional)

`VBSOverlay_Setup_vX.Y.Z.exe /SILENT`

* * *

## Startup and Operating Principles

### Startup

*   VBS Overlay runs as a user-level process
    
*   An icon appears in the system notification area (Tray)
    

### General Philosophy

*   No focus is taken from show applications
    
*   Transparent, non-clickable overlay
    
*   Negligible impact on system performance
    

* * *

## Tray Menu

The **Tray Menu** is the **main access point** to VBS Overlay.

It allows controlling the application without opening intrusive windows.

### Available Functions

*   Open the Dashboard
    
*   Open the Manage window
    
*   Show / hide the Overlay
    
*   Quit the application (clean shutdown)
    

### Best Practices

*   Use the Tray Menu before and after the show
    
*   Avoid any interaction during live operation
    

* * *

## Dashboard

The **Dashboard** is the **real-time monitoring interface**.

It is designed for **observation**, not configuration.

### Displayed Information

#### General

*   Machine name (You can change the display name)
    
*   VBS Overlay version
    
*   Global status
    

#### GPU

*   Full list of detected GPUs
    
*   GPU usage
    
*   VRAM used / available
    
*   Multi-GPU support
    

#### Storage

*   Drive list
    
*   Total capacity
    
*   Free space
    

#### Network

*   All active network interfaces
    
*   Associated IP addresses
    
*   Multi-line display when required
    

#### Flags

*   PSC indicators
    
*   Updated only on state change
    
*   Immediate readability (OK / KO)
    

* * *

## Manage Window

The **Manage window** is the **configuration center** of VBS Overlay.

All changes must be performed **outside of live operation**.

### Main Sections

*   Machines
    
*   Link
    
*   Associated options
    

* * *

## Machines

### Local Machine

*   Always present
    
*   Clearly identified
    
*   Cannot be removed
    

### LAN Machines

*   Automatic detection on the local network
    
*   Connection status display
    
*   Main / backup multi-machine supervision
    

* * *

## Link, Show Mode, Pattern, Desk Lock

### Link

The **Link** section groups functions related to:

*   communications
    
*   monitoring
    
*   logical states
    

Sensitive area — handle with care.

* * *

### Show Mode

**Role**  
Locks VBS Overlay into a stable state for live operation.

**Effects**

*   Disables risky actions
    
*   Freezes the interface
    
*   Reduces possible interactions
    

**Recommendation:** enable before the audience arrives and keep it active until the end of the show.

* * *

### Pattern

**Role**  
Displays a full-screen test pattern.

**Uses**

*   Screen alignment
    
*   Mapping verification
    
*   Signal/output testing
    

Use outside of live operation.

* * *

### Desk Lock

**Role**  
Blocks all user interaction with the Windows desktop.

**Effects**

*   Mouse and keyboard disabled
    
*   Overlay remains visible
    
*   Show applications remain unaffected
    

Enable only when the show is fully ready.

* * *

## Flags & OSC

### Definition

A **Flag** is a **visual status indicator**.  
It performs no action and triggers no automation.

It is used to:

*   confirm a connection
    
*   verify an external state
    
*   anticipate a failure
    

* * *

### Heartbeat Principle

*   Messages received regularly → Flag ON
    
*   Messages stop → timeout → Flag OFF
    

* * *

### Recommended OSC Structure

`/vbs/flag/<flag_name>`

Examples:

`/vbs/flag/psc1 /vbs/flag/companion /vbs/flag/network`

### Companion Example

`/vbs/flag/companion 1`

*   Messages received → flag ON
    
*   OSC loss / crash / network failure → flag OFF after timeout
    

### Flag Best Practices

*   Always use a heartbeat
    
*   Timeout must be greater than the sending interval
    
*   One flag = one clear piece of information
    

**Never:**

*   trigger a critical action
    
*   control a show using flags
    

* * *

## Operational Best Practices

*   Check the Dashboard before the show
    
*   Enable Show Mode before the audience
    
*   Test Pattern outside live operation
    
*   Use Desk Lock as a last resort
    
*   Use flags as indicators only
    

* * *

## Troubleshooting

#### In the event that the application becomes unresponsive while the desk lock is engaged, there is an emergency keyboard shortcut to kill the application: CTRL + ALT + SHIFT + F12

### Overlay Not Visible

*   Check the Tray icon
    
*   Check the target display
    
*   Check user permissions
    

### Incorrect GPU Data

*   Check GPU drivers
    
*   Check multi-GPU configuration
    
*   Restart VBS Overlay
    

### Network Not Displayed

*   Check the network interface
    
*   Check the local firewall
    
*   Ensure an IP address is assigned
    

* * *

## Support, Updates, and Distribution

*   Updates are available via **GitHub Releases**
    
*   Always match application version with the manual version
    
*   For support, provide:
    
    *   exact version
        
    *   Dashboard screenshot
        
    *   operating context
        

**Source code is not public.**

© Video Bridge Solutions — VBS Overlay

* * *






