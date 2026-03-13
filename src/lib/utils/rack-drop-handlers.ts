/**
 * Rack Drop Event Handlers
 * Dispatches resolved drop actions into Svelte custom events.
 * Extracted from Rack.svelte to reduce component size.
 */

import type { DeviceFace, SlotPosition } from "$lib/types";
import type { DropAction } from "$lib/utils/rack-drop-coordinator";
import { buildCollisionMessage } from "$lib/utils/rack-drop-coordinator";
import type { Rack, DeviceType } from "$lib/types";
import type { getToastStore } from "$lib/stores/toast.svelte";
import { hapticError } from "$lib/utils/haptics";

export interface RackEventCallbacks {
  ondevicemove?: (
    event: CustomEvent<{
      rackId: string;
      deviceIndex: number;
      newPosition: number;
      slot_position?: SlotPosition;
    }>,
  ) => void;
  ondevicemoverack?: (
    event: CustomEvent<{
      sourceRackId: string;
      sourceIndex: number;
      targetRackId: string;
      targetPosition: number;
      slot_position?: SlotPosition;
    }>,
  ) => void;
  ondevicedrop?: (
    event: CustomEvent<{
      rackId: string;
      slug: string;
      position: number;
      slot_position?: SlotPosition;
    }>,
  ) => void;
}

/**
 * Dispatch a resolved drop action by firing the appropriate custom event.
 * Handles invalid drops with toast messages and haptic feedback.
 */
export function dispatchDropAction(
  action: DropAction,
  callbacks: RackEventCallbacks,
  collisionContext?: {
    rack: Rack;
    deviceLibrary: DeviceType[];
    faceFilter?: DeviceFace;
    toastStore: ReturnType<typeof getToastStore>;
  },
): void {
  switch (action.kind) {
    case "internal-move":
      callbacks.ondevicemove?.(
        new CustomEvent("devicemove", {
          detail: {
            rackId: action.rackId,
            deviceIndex: action.deviceIndex,
            newPosition: action.targetU,
            slot_position: action.slotPosition,
          },
        }),
      );
      break;
    case "cross-rack-move":
      callbacks.ondevicemoverack?.(
        new CustomEvent("devicemoverack", {
          detail: {
            sourceRackId: action.sourceRackId,
            sourceIndex: action.sourceIndex,
            targetRackId: action.targetRackId,
            targetPosition: action.targetU,
            slot_position: action.slotPosition,
          },
        }),
      );
      break;
    case "palette-drop":
      callbacks.ondevicedrop?.(
        new CustomEvent("devicedrop", {
          detail: {
            rackId: action.rackId,
            slug: action.slug,
            position: action.targetU,
            slot_position: action.slotPosition,
          },
        }),
      );
      break;
    case "invalid": {
      hapticError();
      if (collisionContext) {
        const message = buildCollisionMessage(
          action.feedback,
          collisionContext.rack,
          collisionContext.deviceLibrary,
          action.deviceHeight,
          action.targetU,
          action.excludeIndex,
          collisionContext.faceFilter,
          action.slotPosition,
        );
        if (message) {
          collisionContext.toastStore.showToast(message, "warning", 3000);
        }
      }
      break;
    }
  }
}
