class AddStatusToTrakker < ActiveRecord::Migration
  def change
    add_column :trakkers, :status, :string
  end
end
