import React from 'react'

export type Handler = (e?: React.MouseEvent) => void

/**
 * Ctx — the house's navigation. Every door in the building and every chapter
 * link routes through these. Chapters import their own copy from data.ts;
 * Ctx carries only the ways to move between rooms.
 */
export interface Ctx {
  openFounderRoom: Handler; closeFounderRoom: Handler
  openBlueprint: Handler; closeBlueprint: Handler
  openTable: Handler; closeTable: Handler
  openLibrary: Handler; closeLibrary: Handler
  openStudio: Handler; closeStudio: Handler
  /** The Studio — the workshop page (distinct from In Residence / Resident Experts) */
  openStudioPage: Handler; closeStudioPage: Handler
  openAdvisory: Handler; closeAdvisory: Handler
  openStage: Handler; closeStage: Handler
  openPeople: Handler; closePeople: Handler
  openStories: Handler; closeStories: Handler
  openHouse: Handler; closeHouse: Handler
  openWhyBelieve: Handler; closeWhyBelieve: Handler
  openHouses: Handler; closeHouses: Handler
  openWork: Handler; closeWork: Handler
  openFieldNotes: Handler; closeFieldNotes: Handler
  /** open a dedicated experience page (e.g. 'founders-room') */
  openDoorway: (id: string) => Handler; closeDoorway: Handler
  /** The House Directory — the brass plaque, openable as an overlay from anywhere */
  openDirectory: Handler; closeDirectory: Handler
  /** close every overlay and return to the building (the guided walk) */
  toBuilding: Handler
  receiveKey: Handler; askKey: Handler; closeKey: Handler
  replay: Handler
  /** scroll the building to a given room id (e.g. 'garden') */
  gotoRoom: (id: string) => Handler
  /** map a room key ('founders','library',…) to the handler that opens it */
  goForRoomKey: (key: string) => Handler
  hasKey: boolean
}
