'use client';

import { useActionState } from 'react';
import { createMeeting, type State } from '@/lib/actions';

const initialState: State = { message: null, errors: {} };

const meetingTypes = ['regular', 'testimony', 'stake', 'general', 'special'];

export default function CreateMeetingForm() {
  const [state, formAction, isPending] = useActionState(createMeeting, initialState);

  return (
    <form action={formAction} className="space-y-4 max-w-2xl">
      <div>
        <label htmlFor="date" className="block mb-1 font-medium">Date</label>
        <input
          id="date"
          name="date"
          type="date"
          required
          aria-describedby="date-error"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <div id="date-error" aria-live="polite" aria-atomic="true">
          {state.errors?.date?.map((e) => <p key={e} className="mt-1 text-sm text-red-600">{e}</p>)}
        </div>
      </div>

      <div>
        <label htmlFor="meetingType" className="block mb-1 font-medium">Meeting Type</label>
        <select
          id="meetingType"
          name="meetingType"
          required
          aria-describedby="meetingType-error"
          className="w-full border border-gray-300 rounded px-3 py-2"
        >
          {meetingTypes.map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
        <div id="meetingType-error" aria-live="polite" aria-atomic="true">
          {state.errors?.meetingType?.map((e) => <p key={e} className="mt-1 text-sm text-red-600">{e}</p>)}
        </div>
      </div>

      <div>
        <label htmlFor="presiding" className="block mb-1 font-medium">Presiding</label>
        <input
          id="presiding"
          name="presiding"
          required
          aria-describedby="presiding-error"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <div id="presiding-error" aria-live="polite" aria-atomic="true">
          {state.errors?.presiding?.map((e) => <p key={e} className="mt-1 text-sm text-red-600">{e}</p>)}
        </div>
      </div>

      <div>
        <label htmlFor="conducting" className="block mb-1 font-medium">Conducting</label>
        <input
          id="conducting"
          name="conducting"
          required
          aria-describedby="conducting-error"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <div id="conducting-error" aria-live="polite" aria-atomic="true">
          {state.errors?.conducting?.map((e) => <p key={e} className="mt-1 text-sm text-red-600">{e}</p>)}
        </div>
      </div>

      <fieldset className="border border-gray-200 rounded p-4">
        <legend className="font-medium px-1">Opening Hymn</legend>
        <div className="flex gap-4">
          <div className="w-24">
            <label htmlFor="openingHymnNumber" className="block mb-1 text-sm">Number</label>
            <input
              id="openingHymnNumber"
              name="openingHymnNumber"
              type="number"
              required
              aria-describedby="openingHymnNumber-error"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="openingHymnTitle" className="block mb-1 text-sm">Title</label>
            <input
              id="openingHymnTitle"
              name="openingHymnTitle"
              required
              aria-describedby="openingHymnTitle-error"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
        <div id="openingHymnNumber-error" aria-live="polite" aria-atomic="true">
          {state.errors?.openingHymnNumber?.map((e) => <p key={e} className="mt-1 text-sm text-red-600">{e}</p>)}
        </div>
        <div id="openingHymnTitle-error" aria-live="polite" aria-atomic="true">
          {state.errors?.openingHymnTitle?.map((e) => <p key={e} className="mt-1 text-sm text-red-600">{e}</p>)}
        </div>
      </fieldset>

      <div>
        <label htmlFor="openingPrayer" className="block mb-1 font-medium">Opening Prayer</label>
        <input
          id="openingPrayer"
          name="openingPrayer"
          required
          aria-describedby="openingPrayer-error"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <div id="openingPrayer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.openingPrayer?.map((e) => <p key={e} className="mt-1 text-sm text-red-600">{e}</p>)}
        </div>
      </div>

      <fieldset className="border border-gray-200 rounded p-4">
        <legend className="font-medium px-1">Sacrament Hymn</legend>
        <div className="flex gap-4">
          <div className="w-24">
            <label htmlFor="sacramentHymnNumber" className="block mb-1 text-sm">Number</label>
            <input
              id="sacramentHymnNumber"
              name="sacramentHymnNumber"
              type="number"
              required
              aria-describedby="sacramentHymnNumber-error"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="sacramentHymnTitle" className="block mb-1 text-sm">Title</label>
            <input
              id="sacramentHymnTitle"
              name="sacramentHymnTitle"
              required
              aria-describedby="sacramentHymnTitle-error"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
        <div id="sacramentHymnNumber-error" aria-live="polite" aria-atomic="true">
          {state.errors?.sacramentHymnNumber?.map((e) => <p key={e} className="mt-1 text-sm text-red-600">{e}</p>)}
        </div>
        <div id="sacramentHymnTitle-error" aria-live="polite" aria-atomic="true">
          {state.errors?.sacramentHymnTitle?.map((e) => <p key={e} className="mt-1 text-sm text-red-600">{e}</p>)}
        </div>
      </fieldset>

      <fieldset className="border border-gray-200 rounded p-4">
        <legend className="font-medium px-1">Closing Hymn</legend>
        <div className="flex gap-4">
          <div className="w-24">
            <label htmlFor="closingHymnNumber" className="block mb-1 text-sm">Number</label>
            <input
              id="closingHymnNumber"
              name="closingHymnNumber"
              type="number"
              required
              aria-describedby="closingHymnNumber-error"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div className="flex-1">
            <label htmlFor="closingHymnTitle" className="block mb-1 text-sm">Title</label>
            <input
              id="closingHymnTitle"
              name="closingHymnTitle"
              required
              aria-describedby="closingHymnTitle-error"
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
        </div>
        <div id="closingHymnNumber-error" aria-live="polite" aria-atomic="true">
          {state.errors?.closingHymnNumber?.map((e) => <p key={e} className="mt-1 text-sm text-red-600">{e}</p>)}
        </div>
        <div id="closingHymnTitle-error" aria-live="polite" aria-atomic="true">
          {state.errors?.closingHymnTitle?.map((e) => <p key={e} className="mt-1 text-sm text-red-600">{e}</p>)}
        </div>
      </fieldset>

      <div>
        <label htmlFor="closingPrayer" className="block mb-1 font-medium">Closing Prayer</label>
        <input
          id="closingPrayer"
          name="closingPrayer"
          required
          aria-describedby="closingPrayer-error"
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <div id="closingPrayer-error" aria-live="polite" aria-atomic="true">
          {state.errors?.closingPrayer?.map((e) => <p key={e} className="mt-1 text-sm text-red-600">{e}</p>)}
        </div>
      </div>

      {state.message ? <p className="text-sm text-red-600">{state.message}</p> : null}

      <button
        type="submit"
        disabled={isPending}
        className="bg-emerald-800 text-white px-6 py-2 rounded hover:bg-emerald-900 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isPending ? 'Saving...' : 'Save Meeting'}
      </button>
    </form>
  );
}
