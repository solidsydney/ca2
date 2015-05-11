class CreateTrakkers < ActiveRecord::Migration
  def change
    create_table :trakkers do |t|
      t.string :number
      t.date :date
      t.string :location
      t.string :destination_service_area
      t.string :origin_service_area
      t.string :signed_for_by

      t.timestamps
    end
  end
end
