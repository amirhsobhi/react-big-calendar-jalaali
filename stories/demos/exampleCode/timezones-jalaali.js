import React, { Fragment, useState, useEffect, useMemo } from 'react'
import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
import moment from 'moment-jalaali'
import 'moment-timezone'
import DemoLink from '../../DemoLink.component'
import events from '../../resources/events'
import TimezoneSelect from '../TimezoneSelect'

const pMoment = moment
pMoment.loadPersian({ dialect: 'persian-modern' })

const defaultTZ = pMoment.tz.guess()
// console.log(defaultTZ)
const defaultDateStr = pMoment().format('jYYYY-jMM-jDD')

function getDate(str, momentObj) {
  return momentObj(str, 'jYYYY-jMM-jDD').toDate()
}

export default function Timezones() {
  const [timezone, setTimezone] = useState(defaultTZ)

  const { defaultDate, getNow, localizer, myEvents, scrollToTime } =
    useMemo(() => {
      moment.tz.setDefault(timezone)
      return {
        defaultDate: getDate(defaultDateStr, pMoment),
        getNow: () => pMoment().toDate(),
        localizer: momentLocalizer(pMoment),
        myEvents: [...events],
        scrollToTime: pMoment().toDate(),
      }
    }, [timezone])

  // console.log(localizer)

  const newLocalizer = {
    ...localizer,
    formats: {
      ...localizer.formats,
      agendaDateFormat: 'ddd jDD jMMM',
      dateFormat: 'jDD',
      dayFormat: 'jDD ddd',
      dayHeaderFormat: 'dddd jDD jMMM',
      monthHeaderFormat: 'jMMMM jYYYY',
      weekdayFormat: 'ddd',
    },
  }

  useEffect(() => {
    return () => {
      moment.tz.setDefault() // reset to browser TZ on unmount
    }
  }, [])

  return (
    <Fragment>
      <DemoLink fileName="timezones">
        <TimezoneSelect
          defaultTZ={defaultTZ}
          setTimezone={setTimezone}
          timezone={timezone}
        />
      </DemoLink>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.MONTH}
          events={myEvents}
          getNow={getNow}
          localizer={newLocalizer}
          scrollToTime={scrollToTime}
          rtl
          useJalaali
        />
      </div>
    </Fragment>
  )
}
